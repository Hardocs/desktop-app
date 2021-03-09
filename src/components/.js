<v-list-item-content>
            <v-list-item-title @click="setCurrentDoc(doc.id)" :class="{ 'font-bold': doc.id == currentDocId }">{{ doc.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon v-if="doc.fileName !== entryFile" @click="confirmDelete(doc.id)">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>