# projetBibliotheque

Par Adrien LEIB et Hugo-Jean EGU

Cette application est généré avec l'outil JHipster 6.10.4, vous pouvez aider de la documention depuis le lien suivant :[https://www.jhipster.tech/documentation-archive/v6.10.4](https://www.jhipster.tech/documentation-archive/v6.10.4).

## Développement

Avant de créer ce projet, vous devez installer et configurer les dépenses suivantes sur votre machine:

1. [Node.js][]: Nous utilisons Node pour compiler le serveur web et créer le projet. Selon votre système,
   vous pouvez installer Node à partir de la souce ou depuis un paquet pré-configuré.

Exécutez la commande suivante lorsque Node sera installé afin d'ajouter à votre projet les outils de développement nécessaires au bon fonctionnement de celui-ci. De plus, vous aurez besoin de la relancer à chaque fois que les dépendences de votre projet sont changés.[package.json](package.json).

```
npm install
```

Nous utilisons des scripts npm et [Webpack] [] comme système de construction.

Exécutez les commandes suivantes dans deux terminaux distincts afin que votre navigateur s'actualise automatiquement lorsque les fichiers changent.

```

./mvnw


npm start
```

Npm peut également gérer les dépendances CSS et JavaScript utilisées dans cette application. Vous pouvez mettre à jour les dépendances en spécifiant une version plus récente sur le fichier [package.json](package.json). Vous pouvez également exécuter `npm update` et` npm install` pour les gérer.

Ajoutez l'attribut `help` sur n'importe quelle commande afin d'obtenir d'avantage de précision sur son utilisation. Par exemple, `npm help update`.

La commande `npm run` permet de répertorier tous les scripts disponibles à exécuter pour ce projet.

### PWA

Jhipster est accompagné du support PWA (Progressive Web App), par défaut il est désactivé. La fonctionnalité principale de PWA est d'être un service worker. Un Service Worker est un script chargé parallèlement aux scripts de votre page et qui va s'exécuter en dehors du contexte de votre page web. Bien que le Service Worker n'ait pas accès au DOM ou aux interactions avec l'utilisateur, il va pouvoir communiquer avec vos scripts via l'API postMessage.

Par défaut, le code d'initialisation du service worker est commenté. Pour l'activer, décommentez le code suivant dans le fichier `src/main/webapp/index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function () {
      console.log('Service Worker Registered');
    });
  }
</script>
```

Note: "[Workbox](https://developers.google.com/web/tools/workbox/) powers JHipster's service worker" est un outil qui génère dynamiquement le fichier `service-worker.js`.

### Gérer les dépendances

Par exemple, pour ajouter la bibliothèque [Leaflet][] en tant que dépendance à votre application, vous éxécuterez la commande suivante:

```
npm install --save --save-exact leaflet
```

Pour bénéficier des "TypeScript" définie sur le site [DefinitelyTyped][], vous éxécuterez la commande suivante:

```
npm install --save-dev --save-exact @types/leaflet
```

Enfin, il vous suffira d'importer les fichier de type "JS" et "CSS" spécifiés dans la bibliothèqe d’installations afin que [Webpack][] les reconaisse. Note:
Then you would import the JS and CSS files specified in library's installation instructions so that [Webpack][] knows about them:
Note: Il est encore possible de rajouter quelques fonctionnalités avec la bibliothèque open source "Leaftlet", qui ne sont pas détaillé ici.

Pour connaître davantage d'information sur la manière d'utisé JHipster, vous pouvez consulter le lien suivant [Using JHipster in development][].

## Le developpement à la production

### Comprésser avec jar

Pour constuire le fichier "jar" et optimiser l'application projetBibliotheque à la production, éxecutez la commande suivante:

```

./mvnw -Pprod clean verify


```

Cela concaténera et minifiera les fichiers CSS et JavaScript du client. Il modifiera également `index.html` pour qu'il fasse référence à ces nouveaux fichiers.
Pour vous assurer que tout a fonctionné, exécutez:

```

java -jar target/*.jar


```

Ensuite naviguer
Then accéder à l'url suivante sur votre navigateur : [http://localhost:8080](http://localhost:8080).

Réferez vous à [Using JHipster in production][] pour plus de détails.

### Comprésser avec war

Pour compresser votre application en tant que "war" afin de la déployer sur un serveur d'applcations, éxecutez la commande suivante:

```

./mvnw -Pprod,war clean verify


```

## Réalier des tests.

Pour lancer les tests de votre application, exécutez:

```
./mvnw verify
```

### Réaliser des test clients.

Les tests unitaires sont éxecutés par [Jest][] et écrits avec [Jasmine][]. Vous pouvez les retrouver sur [src/test/javascript/](src/test/javascript/) et les éxecuter avec la commande suivante:

```
npm test
```

Pour plus d'informations, reportez-vous sur ce lien [Running tests page][].

### La qualité du code

Sonar est utilisé pour analyer la qualité du code. Vous pouvez démarrer Sonar sur un serveur local (accessible sur http://localhost:9001) avec la commande suivante:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Vous pouvez lancer un analyser Sonar en se réferant la documentaiton suivante [sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner) ou en utilisant le plugin maven.

Ensuite, lancer l'analyse Sonar:

```
./mvnw -Pprod clean verify sonar:sonar
```

Si vous souhaitez relancer une étape particulière de l'analyse, assurez-vous de spéciafier l'attribut `initialize` puisque les propriétés Sonar sont chargées à partir du fichier sonar-project.properties.

```
./mvnw initialize sonar:sonar
```

Pour plus d'information, référencez vous au lien suivant : [Code quality page][].

## Utiliser Docker pour simplifier le developpement (option)

Vous pouvez utiliser Docker pour faciliter votre utilisation de JHipster. Un certain nombre de fichier "docker-compose" sont disponibles dans le repertoire [src/main/docker](src/main/docker) et doivent être lancer mettre en place le principe de docker.

Par exemple, pour demarrer une base de donnée postegresql dans un conteneur docker, exécutez la commande suivante :

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

Pour stopper et supprimer ce même conteneur, exécuter la commande suivante:

```
docker-compose -f src/main/docker/postgresql.yml down
```

Vous pouvez également deployer avec docker l'ensemble de votre application ( avec les services dont elle dépend ) en créeant une image docker de celle ci avec la commande suivante :

```
./mvnw -Pprod verify jib:dockerBuild
```

Et ensuite exécutez:

```
docker-compose -f src/main/docker/app.yml up -d
```

Pour plus d'information sur docker vous pouvez consulter sa documentation sur le lien suivant : [Using Docker and Docker-Compose][], cette page contient toutes les informations sur docker-compose (`jhipster docker-compose`), qui est capable de générer des configurations de docker pour une ou plusieurs applications JHipster..

## Intégration continue (option)

Pour configurer une intégration continue pour votre projet, exécutez le sous-générateur ci-cd (`jhipster ci-cd`), cette commande vous permettra de générer des fichiers de configuration pour un certain nombre de systèmes d’intégration continue. Consultez la page suivante pour obtenir davantage d'information [Setting up Continuous Integration][].

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 6.10.4 archive]: https://www.jhipster.tech/documentation-archive/v6.10.4
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v6.10.4/development/
[service discovery and configuration with the jhipster-registry]: https://www.jhipster.tech/documentation-archive/v6.10.4/microservices-architecture/#jhipster-registry
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v6.10.4/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v6.10.4/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v6.10.4/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v6.10.4/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v6.10.4/setting-up-ci/
[node.js]: https://nodejs.org/
[yarn]: https://yarnpkg.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[protractor]: https://angular.github.io/protractor/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
