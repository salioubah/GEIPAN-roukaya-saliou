# GEIPAN-roukaya-saliou-rania

![Geipan!](img/GEIPAN_logo.png "Algo génétique!")
***

## Participants

> ### Roukaya IBEN SALAH
> - Création du projet serveur
> - Développement de fonctions Back End
> - Détail des cas Back et Front End
> - Témoignages et détails 
> - Gestion de routage ***@uirouter/react***
>
> ### Rania BENSASSI
> - Développement de fonctions Back End
> - Réalisation de graphes (onglet stats)
> - Gestion de filtres Date
>
> ### Mamadou Saliou BAH
> - Création du projet Front End
> - Développemnt de fonctions Back End
> - Affichage des cas dans un tableau
> - Gestion de la pagination côté Front et Back


```sh
# Importer les 2 fichiers CSV dans mongodb:

$ mongoimport --db geipan_database --collection cas --drop --file cas_pub.csv --type csv --headerline
$ mongoimport --db geipan_database --collection temoignages --drop --file temoignages_pub.csv --type csv --headerline

# Tester l'existance de la Base de donnée(geipan_database) ainsi que les 2 collections (cas et temoignages):

$mongo
>show dbs
>use geipan_database
>db.cas.find()
>db.temoignages.find()
> db.cas.count()
4464
> db.temoignages.count()
6850

# Lancer le serveur:
cd serveur/
npm install
nodemon server.js (app listening on port 8888!)

# Lancer le client:
cd client/
npm install
npm start (You can now view client in the browser. Local:http://localhost:3000)

```






