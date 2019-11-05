<template>
<div>
	<v-overlay :value="overlay">
		<v-progress-circular indeterminate size="64"></v-progress-circular>
	</v-overlay>
	<v-card>
		<v-toolbar flat color="grey lighten-3">
			<v-toolbar-title class="title">{{ book.titulo }} | {{ title }}</v-toolbar-title>
		</v-toolbar>
		<v-form
			ref="form"
			v-model="valid"
			class="form-padding"
			lazy-validation
		>
			<v-text-field
				v-model="chapter.nome"
				:rules="nomeRules"
				label="Nome"
				required
			></v-text-field>
            <v-textarea
                v-model="chapter.conteudo"
                :rules="conteudoRules"
                label="Texto"
                rows="4"
                row-height="30"
            ></v-textarea>
			<div class="buttons">
				<v-btn 
					large 
					:disabled="!valid" 
					color="teal" 
					class="mt-5" 
					@click="submitForm">
					Salvar
				</v-btn>
				<v-btn 
					large
					@click="cancel"
					class="mt-5 mr-4">
					Voltar
				</v-btn>
			</div>
		</v-form>
	</v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
	data: () => ({
		title: "Cadastrar capítulo",
	  	valid: false,
		overlay: false,
        bookId: null,
        idChapter: null,
	  	book: {},
        chapter: {
            nome: '',
            conteudo: ''
        },
	  	nomeRules: [
			v => !!v || 'Nome obrigatório',
	  	],
	  	conteudoRules: [
			v => !!v || 'Texto obrigatório',
	  	],
	}),
	methods: {
	  	validate () {
			if (this.$refs.form.validate()) {
		   		return true;
			}
			return false;
	  	},
	  	reset () {
			this.$refs.form.reset()
	  	},
	  	submitForm() {
		  	if(this.validate()) {
				this.overlay = true;
				const method = this.idChapter ? 'put' : 'post';
				const URLparam = this.idChapter ? this.idChapter : '';
                let message = this.idChapter ? 'Capítulo alterado com sucesso' : 'Capítulo cadastrado com sucesso';
                
			  	this.axios[method](`books/${this.bookId}/chapters/${URLparam}`, this.chapter).then(response => {
					this.overlay = false;
					Swal.fire({
						type: 'success',
						text: message,
					})
					if(method == 'post') {
						this.reset();
					}
				});
		  	}
	  	},
	  	cancel() {
		  	this.$router.go(-1);
        },
        getBook() {

            if (!!this.$route.params.bookId) {

                this.bookId = this.$route.params.bookId;
				this.axios.get(`books/${this.bookId}`).then(response => {
                    this.book = { ...response.data};

                    if(!this.book) {
                        Swal.fire({
                            type: 'error',
                            text: 'Livro inválido',
                        })
                        this.$router.push({name: 'listBooks'});
                    }
				});
			}
        },
		init () {
			if (!!this.$route.params.id) {

				this.idChapter = this.$route.params.id;
                this.title = 'Editar capítulo';

				this.axios.get(`books/${this.bookId}/chapters/${this.idChapter}`).then(response => {
					this.chapter = { ...response.data};
				});
			}
		},
	},
	created() {
        this.getBook();
		this.init();
	}
  }
</script>

<style scoped>
 	.form-padding{
	 	padding: 30px 50px;
 	}
 	.buttons {
		direction: rtl;
		display: flex;
		justify-content: flex-start;
 	}
</style>