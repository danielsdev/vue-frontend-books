<template>
	<div>
        <v-breadcrumbs :items="breadcrumbs" large>
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
		<v-card>
			<v-toolbar flat color="grey lighten-3">
				<v-toolbar-title class="title">{{ book.titulo}} | Capítulos cadastrados</v-toolbar-title>
                <router-link :to="{ name: 'createChapters', params: {bookId: book._id } }">
					<v-tooltip right>
						<template v-slot:activator="{ on }">
							<v-btn class="ml-3" text icon color="primary" v-on="on">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</template>
						<span>Cadastrar capítulo</span>
					</v-tooltip>
				</router-link>
			</v-toolbar>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center">Nome</th>
							<th class="text-right">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(chapter, index) in chapters" :key="index">
							<td>{{ chapter.nome }}</td>
                            <td class="text-right">
								<router-link :to="{ name: 'editChapters', params: {book: book._id, id: chapter._id } }">
									<v-tooltip bottom>
										<template v-slot:activator="{ on }">
											<v-btn text icon color="yellow" v-on="on">
												<v-icon>mdi-pencil</v-icon>
											</v-btn>
										</template>
										<span>Editar</span>
									</v-tooltip>
								</router-link>
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-btn text icon color="red" v-on="on" @click="deleteChapter(chapter._id)">
											<v-icon>mdi-close</v-icon>
										</v-btn>
									</template>
									<span>Excluir</span>
								</v-tooltip>
							</td>
						</tr>
						<tr v-if="chapters.length == 0">
							<td colspan="2">Nenhum registro encontrado</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-card>
	</div>
</template>

<script>

import Swal from 'sweetalert2'

export default {
    data () {
		return {
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    disabled: false,
                    to: { name: 'home'},
                },
                {
                    text: 'Livros',
                    disabled: false,
                    to: { name: 'listBooks' }
                },
                {
                    text: 'Capítulos',
                    disabled: true,
                    to: { name: 'listChapters' }
                },
            ],
            book: {},
            chapters: [],
            bookId: null,
		}
	},
	methods: {
        getBook() {

            if (!!this.$route.params.bookId) {

				this.bookId = this.$route.params.bookId;

				this.axios.get(`books/${this.bookId}`).then(response => {
                    this.book = { ...response.data};
                    this.chapters = this.book.capitulos;
				});
			}
        },
        deleteChapter(idChapter) {

			Swal.fire({
				title: 'Atenção',
				text: "Tem certeza que deseja excluir esse registro ?",
				type: 'warning',
				showCancelButton: true,
				cancelButtonText: 'Cancelar',
				confirmButtonText: 'Excluir',
				confirmButtonColor: '#d33',
				reverseButtons: true
			}).then((result) => {
				if (result.value) {

					this.axios.delete(`books/${this.bookId}/chapters/${idChapter}`).then(response => {
						Swal.fire(
							'',
							'Capítulo excluído com sucesso.',
							'success'
						)
						this.getBook();
					});
				}
			})
        }
	},
    created() {
		this.getBook();
    }
  }
</script>