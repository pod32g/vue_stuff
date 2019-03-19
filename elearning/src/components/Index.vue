<template>
  <div>
    <header class="masthead">
      <div class="container">
        <div class="intro-text">
          <div class="intro-lead-in">¡Bienvenido a E-Learning a tu medida!</div>
          <div class="intro-heading text-uppercase">Tú nueva solucion de aprendizaje digital</div>
        </div>
      </div>
    </header>
    <section id="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Acerca de</h2>
            <h3
              class="section-subheading text-muted"
            >E-Learning a tu medida apoya e incrementa la capacidad de aprendizaje de los estudiantes, apoyándolos con material adecuado a sus necesidades, para así, tener un desempeño mejor y más óptimo en clases, con el fin de maximizar el aprendizaje escolar.</h3>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-graduation-cap fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Aprendizaje</h4>
            <p
              class="text-muted"
            >Nos importa el aprendizaje del alumno, por eso esta plataforma esta diseñada para ayudarle a aprender, clasificándolo de acuerdo a la forma en la que aprende, para poder enfocarnos en sus necesidades especificas como estudiante.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Facil de usar</h4>
            <p
              class="text-muted"
            >Nuestro diseño es bastante sencillo de utilizar, ya que nos concentramos en expandir las capacidades de otras plataformas ya existentes y nos concentramos solo en el nucleo de una plataforma de aprendizaje en linea.</p>
          </div>
          <div class="col-md-4">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="service-heading">Segura</h4>
            <p
              class="text-muted"
            >E-Learning a tu medida utiliza estandares de seguridad seguidos por toda la industria de la informática. Nuestras contraseñas estan encriptadas y los datos de nuestros usuarios a salvo.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-light" id="team">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Nuestro equipo</h2>
            <h3
              class="section-subheading text-muted"
            >Estudiantes de CUCEI, emprendedores y conocedores de la informática y computación.</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="/static/img/team/1.jpg" alt>
              <h4>David Perez</h4>
              <p class="text-muted">Lead Developer</p>
              <ul class="list-inline social-buttons">
                <li class="list-inline-item">
                  <a href="https://twitter.com/pod32g">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="https://www.facebook.com/pod32g">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="https://www.linkedin.com/in/david-ivan-perez-salazar-a010b395/">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="/static/img/team/2.jpg" alt>
              <h4>Abraham De Lira</h4>
              <p class="text-muted">Backend Developer</p>
              <ul class="list-inline social-buttons">
                <li class="list-inline-item">
                  <a href="https://twitter.com/abrahambrea11">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="https://www.facebook.com/abraham.delirarodriguez">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="/static/img/team/3.jpg" alt>
              <h4>Paul Hermosillo</h4>
              <p class="text-muted">Frontend Developer</p>
              <ul class="list-inline social-buttons">
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="#">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "Index",
  data() {
    return {
      msg: "Hello World banana"
    };
  },
  created() {
    if (this.$session != null) {
      this.$router.push("/cursos");
    }
  }
};
</script>

<style >
.jumbotron {
  height: 100%;
}
</style>

