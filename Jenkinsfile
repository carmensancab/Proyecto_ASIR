/*pipeline {
    /* insert Declarative Pipeline here */
   // agent any
    //stages {
       // stage ('Realizar el build de mi contenedor Docker'){
      //      echo "Hooollla Estamos haciendo pruebas"
    //    }
  //  }
//}

node {

    checkout scm

    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {

        def customImage = docker.build("carmensancab/nodeapp")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}