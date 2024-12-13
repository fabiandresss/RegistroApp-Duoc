describe('Verificar Sistema de Asistencia Duoc UC', () => {
  
     it('Verificar Login correcto', () => {
      cy.visit('http://localhost:8100/').then(()=>{
        cy.get('#correo').type('atorres');
        cy.get('#password').type('1234');
        cy.contains('Ingresa').click();
        cy.intercept('/inicio').as('route').then(()=>{
          cy.get('app-header').get('#cerrarSesion').click();
        });
      });
     })

     it('Verificar Login incorrecto', () => {
      cy.visit('http://localhost:8100/').then(()=>{
        cy.get('#correo').type('aaaaa');
        cy.get('#password').type('111111');
        cy.contains('Ingresa').click();
        cy.url().should('include','/ingreso');
      });
     })
  
   //FORO
   it('El foro agregue una nueva publicación', () => {
    cy.visit('http://localhost:8100/');

    cy.get('#correo')
      .type('atorres');

    cy.get('#password')
      .type('1234');

    cy.wait(1000);

    cy.contains('Ingresa').click();

    cy.intercept('/inicio')
      .as('route')
      .then(() => {
        cy.wait(1000);

        cy.get('ion-toast#toast-id')
          .shadow()
          .find('.toast-button')
          .click();

        cy.get('app-footer')
          .get('#foro')
          .click();
        
        cy.get('app-forum')
          .get('#titulo')
          .type('Título de la publicación');

        cy.get('#descripcion')
          .type('Descripción de la publicación');
        
        cy.wait(1000);

        cy.get('#guardar-foro')
          .click();

        cy.get('ion-toast#toast-id')
          .shadow()
          .find('.toast-message')
          .should('exist')
          .and('be.visible')
          .should('contain.text', 'Publicación creada correctamente:');

        cy.get('app-header')
          .get('#cerrarSesion')
          .click();
      });
  });

    it('El foro elimine la publicación creada', () => {
      cy.visit('http://localhost:8100/');

      cy.get('#correo')
        .type('atorres');

      cy.get('#password')
        .type('1234');

      cy.wait(1000);

      cy.contains('Ingresa').click();

      cy.intercept('/inicio')
        .as('route')
        .then(() => {
          cy.wait(1000);

          cy.get('ion-toast#toast-id')
            .shadow()
            .find('.toast-button')
            .click();

          cy.get('app-footer')
            .get('#foro')
            .click();
          
            cy.get('ion-card')
            .contains('Título de la publicación')
            .should('exist')

            cy.get('ion-card')
            .contains('Título de la publicación')
            .parents('ion-col')
            .find('ion-button#eliminar')
            .eq(0)
            .click();

          cy.get('ion-toast#toast-id')
            .shadow()
            .find('.toast-message')
            .should('exist')
            .and('be.visible')
            .should('contain.text', 'Publicación eliminada correctamente:');
          
          cy.wait(1000);

          cy.get('app-header')
            .get('#cerrarSesion')
            .click();
        });

      
  });
  });