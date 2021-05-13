pipeline {
    /* insert Declarative Pipeline here */
    agent any

    environment {
      regCredenciales= 'carmensancab/nodeweb'
      imagenDocker = "$regCredenciales:v.$BUILD_NUMBER"
    }
    // Fases que va a realizar
    stages {
     stage ('Construyendo Docker'){
        steps {
          echo "Construyendo la imagen docker..."
           sh "docker build -t nodeweb ." 
        }
      }

      stage ('Ejecutar aplicacion Nodejs'){
        steps {
          echo "Ejecutar imagen docker"
          sh "docker run -d -p 11631:11631 --rm nodeweb"
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
              sh "docker tag $imagenDocker"
              sh "docker logout"
            }
         }
        }
     
      }
  }
  post { 
        always { 
            echo 'Borramos la imagen Docker para no saturar'
           
        }
    }
}