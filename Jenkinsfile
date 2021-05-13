pipeline {
    /* insert Declarative Pipeline here */
    agent any

    environment {
      regCredenciales= 'carmensancab'
      imagenDocker = ''
    }
    // Fases que va a realizar
    stages {
     stage ('build'){
        steps {
          echo "Construyendo la imagen docker..."
           sh "docker build -t nodeweb" 
        }
      }

      stage ('run'){
        steps {
          echo "Ejecutar imagen docker"
          sh "docker run -d -p 5000:5000 --name nodeweb"
            }
      }
      stage ('Test'){
        steps {
          echo "Haciendo test sencillos de que todo funciona bien"
          echo "Node Version"
          sh "npm -v" // Ver la version de nodejs, eso nos indicará que está arrancado
          echo "Puerto por el que estás ejecutando"
          sh ""
         
        }
      }

      stage ('Push'){
        steps {
          echo "Hacer push a DockerHub"
          script {
            docker.withRegistry( '', regCredenciales ) {
              imagenDocker.push("$BUILD_NUMBER")
              imagenDocker.push('latest')
            }
         }
      }

     
    }
}



