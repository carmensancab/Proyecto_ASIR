pipeline {
    /* Inserte los parametros y stages que debe de hacer nuestra pipeline */
    agent any

    environment {
      def regCredenciales= 'carmensancab/nodeweb'
      def imagenDocker = "$regCredenciales:v.$BUILD_NUMBER"
      
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
          sh "docker run -d -p 11631:11631 --rm $imagenDocker" // Ejecutar la aplicacion y eliminar el contenedor una vez haya acabado
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
              sh "docker login -u $username -p $password"
              sh "docker push $imagenDocker"
            
              sh "docker logout"
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
              def pararDockerContainer = "docker stop $(docker ps | grep "nodeweb" | awk '{print $1}')"
              sh "$pararDockerContainer"
            
          }
           
            //
            //$pararDockerContainer1
             //sh "docker stop $(docker ps | grep "nodeweb" | awk '{print $1}')"
             //sh "docker container stop $imagenDocker"
             //sh "docker container rmi $imagenDocker"

        }
      }  
  }
}