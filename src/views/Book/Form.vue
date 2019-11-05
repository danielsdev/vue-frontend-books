<template>
<div>
	<v-overlay :value="overlay">
		<v-progress-circular indeterminate size="64"></v-progress-circular>
	</v-overlay>
	<v-card>
		<v-toolbar flat color="grey lighten-3">
			<v-toolbar-title class="title">{{ title }}</v-toolbar-title>
		</v-toolbar>
		<v-form
			ref="form"
			v-model="valid"
			class="form-padding"
			lazy-validation
		>
			<v-text-field
				v-model="book.titulo"
				:rules="tituloRules"
				label="Titulo"
				required
			></v-text-field>

			<v-row>
				<v-col cols="12" md="4">
					<v-text-field
						v-model="book.ano_publicacao"
						:rules="ano_publicacaoRules"
						label="Ano de publicação"
						required
					></v-text-field>
				</v-col>

				<v-col cols="12" md="8" >
					<v-text-field
						v-model="book.autor"
						:rules="autorRules"
						label="Autor"
						required
					></v-text-field>
				</v-col>
			</v-row>

			<div class="buttons">
				<v-btn 
					large 
					:disabled="!valid" 
					color="teal" 
					class="mt-5 text-white" 
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
		title: "Cadastrar livro",
	  	valid: false,
		overlay: false,
		idBook: null,  
	  	book: {
		  	titulo: '',
		  	ano_publicacao: null,
		  	autor: ''
	  	},
	  	tituloRules: [
			v => !!v || 'Titulo é obrigatório',
	  	],
	  	ano_publicacaoRules: [
			v => !!v || 'Ano da publicação é obrigatório',
			v => !isNaN(v) || 'Digite apenas números',
	  	],
	  	autorRules: [
			v => !!v || 'Autor é obrigatório',
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
				const method = this.idBook ? 'put' : 'post';
				const URLparam = this.idBook ? this.idBook : '';
				let message = this.idBook ? 'Livro alterado com sucesso' : 'Livro cadastrado com sucesso';
			  	this.axios[method](`books/${URLparam}`, this.book).then(response => {
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
		  	this.$router.push({name: 'listBooks'});
		},
		init () {
			if (!!this.$route.params.id) {

				this.idBook = this.$route.params.id;
				this.title = 'Editar livro';

				this.axios.get(`books/${this.idBook}`).then(response => {
					this.book = { ...response.data};
				});
			}
		},
	},
	created() {
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