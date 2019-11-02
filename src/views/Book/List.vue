<template>
	<div>
		<v-breadcrumbs :items="breadcrumbs" large>
            <template v-if="customDiv" v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
		<v-card>
			<v-toolbar flat color="grey lighten-3">
				<v-toolbar-title class="title">Livros cadastrados</v-toolbar-title>
				<router-link :to="{ name: 'createBook' }">
					<v-tooltip right>
						<template v-slot:activator="{ on }">
							<v-btn class="ml-3" text icon color="primary" v-on="on">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</template>
						<span>Cadastrar livro</span>
					</v-tooltip>
				</router-link>
			</v-toolbar>
			<v-simple-table>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-center">Titulo</th>
							<th class="text-center">Ano de publicação</th>
							<th class="text-center">Autor</th>
							<th class="text-right">Ações</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(book, index) in books" :key="index">
							<td>{{ book.titulo }}</td>
							<td>{{ book.ano_publicacao }}</td>
							<td>{{ book.autor }}</td>
							<td class="text-right">
								<router-link :to="{ name: 'listChapters', params: {bookId: book._id } }">
									<v-tooltip bottom>
										<template v-slot:activator="{ on }">
											<v-btn text icon color="grey" v-on="on">
												<v-icon>mdi-book-open-page-variant</v-icon>
											</v-btn>
										</template>
										<span>Capítulos</span>
									</v-tooltip>
								</router-link>
								<router-link :to="{ name: 'editBook', params: {id: book._id } }">
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
										<v-btn text icon color="red" v-on="on" @click="deleteBook(book._id)">
											<v-icon>mdi-close</v-icon>
										</v-btn>
									</template>
									<span>Excluir</span>
								</v-tooltip>
							</td>
						</tr>
						<tr v-if="books.length == 0">
							<td colspan="4">Nenhum registro encontrado</td>
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
                    href: '/',
                },
                {
                    text: 'Livros',
                    disabled: true,
                    href: '/livros',
                },
            ],
			books: [],
		}
	},
	methods: {
		deleteBook(id){

			let bookId = id;

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

					this.axios.delete(`books/${bookId}`).then(response => {
						Swal.fire(
							'',
							'Livro excluído com sucesso.',
							'success'
						)
						this.getAllBooks();
					});
				}
			})
		},
		getAllBooks(){
			this.axios.get('books/').then(response => {
				this.books = response.data;
			});
		}
	},
    created() {
		this.getAllBooks();
    }
  }
</script>