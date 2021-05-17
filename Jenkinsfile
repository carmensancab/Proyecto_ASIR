pipeline {
    /* Inserte los parametros y stages que debe de hacer nuestra pipeline */
    agent any

    environment {
      def regCredenciales= 'carmensancab/nodeweb' 
      def imagenDocker = "$regCredenciales:v.$BUILD_NUMBER"
      def nameDocker = "nodeCSC" // Etiqueta del nombre de la imagen docker que será utilizada para parar el contenedor
      
    }
    // Fases que va a realizar
    stages {
     stage ('Construyendo Docker'){
        steps {
          echo "Construyendo la imagen docker..."
           sh "docker build -t $imagenDocker ."  // Construir nuestra aplicacion
        }
      }

      stage ('Ejecutar aplicacion Nodejs'){
        steps {
          echo "Ejecutar imagen docker"
          sh "docker run -d -p 11631:11631 --rm --name $nameDocker $imagenDocker" // Ejecutar la aplicacion y eliminar el contenedor una vez haya acabado
            }
      }
      stage ('Test funcionamiento'){
        steps {
          echo "Haciendo test sencillos de que todo funciona bien"
          echo "Node Version"
          sh "npm -v" // Ver la version de nodejs, eso nos indicará que está arrancado  
         
        }
      }

      stage ('Push'){
        steps {
          echo "Hacer push a DockerHub"
          script {
            withCredentials([usernamePassword(credentialsId: 'Dockerhub', passwordVariable: 'password', usernameVariable: 'username')]){
              sh "docker login -u $username -p $password" // Nos logueamos en mi cuenta de Docker Hub
              sh "docker push $imagenDocker" // Hacemos un push contra mi repositorio creado en DockerHub
              sh "docker logout" //Nos deslogueamos de Docker Hub
            }
         }
        }
        }
    } 
            // Post
      post { 
        always { 
            echo 'Paramos la imagen Docker para no saturar'

            script {
              sh "docker stop $nameDocker" // Tan pronto termina de hacer push se para la aplicación
            }
           
        }
      }  
  }
