<template>
	<div>
		<v-row no-gutters class="mb-3">
			<v-col md="8" >
				<v-breadcrumbs :items="breadcrumbs" large>
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</v-col>
			<v-col md="3">
				<v-text-field
					v-model="search"
					append-icon="mdi-search"
					label="Search"
					single-line
					hide-details
				></v-text-field>
			</v-col>
			<v-col md="1" class="mt-4">
				<v-btn color="teal" fab small dark @click="searchBooks()">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</v-col>
		</v-row>
		<v-card>
			<v-toolbar flat color="grey lighten-3">
				<v-toolbar-title class="title">Livros cadastrados</v-toolbar-title>
				<router-link :to="{ name: 'createBook' }">
					<v-tooltip right>
						<template v-slot:activator="{ on }">
							<v-btn class="ml-3" text icon color="teal" v-on="on">
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
						<tr>
							<td colspan="4">
								<v-row justify="end">
									<v-col cols="6" offset="8">
										<v-pagination
											v-model="page"
											:length="5"
											circle
										></v-pagination>
									</v-col>
								</v-row>
							</td>
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
					href: '/'
                },
                {
                    text: 'Livros',
                    disabled: true,
                    to: { name: 'listBooks' }
                },
            ],
			books: [],
			search: '',
			page: 0
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
		getAllBooks(page) {
			
			this.axios.get(`books/page=${page}`).then(response => {
				this.books = { ...response.data};
			});
		},
		searchBooks() {
			let autor = this.search;
			this.axios.get(`books?autor=${autor}`).then(response => {
				this.books = { ...response.data};
			});
		}
	},
    created() {
		this.getAllBooks(this.page);
	},
	watch: {
		page: (value) => {
			this.getAllBooks(value-1);
		}
	}
  }
</script>