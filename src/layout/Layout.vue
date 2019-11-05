<template>
    <div>
        <v-navigation-drawer
        v-model="drawer"
        app
        >
            <v-list dense>
                 <v-list-item link :to="{name: 'home'}">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item class="no-padding">
                            <v-list-item-action>
                                <v-icon>mdi-book</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Livros</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                    <v-list-item class="sub-item" link :to="{name: 'createBook'}">
                            <v-list-item-action>
                                <v-icon>mdi-plus</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>Cadastrar</v-list-item-title>
                            </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="sub-item" link :to="{name: 'listBooks'}">
                        <v-list-item-action>
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Listar</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="teal"
            dark
        >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Aplicação</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col class="text-center">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer
         color="teal"
         app
        >
            <span class="white--text">&copy; 2019</span>
        </v-footer>
    </div>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style scoped>
    a {
        color: rgba(0, 0, 0, 0.87) !important;
        text-decoration: none;
    }
    .no-padding {
        padding: 0px;
    }
    .sub-item {
        padding: 0 30px;
    }
</style>