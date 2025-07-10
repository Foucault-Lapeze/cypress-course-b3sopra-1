describe("Composant Chiffre de César", () => {
  beforeEach(() => {
    cy.visit("../pages/lightbox.html");
  });

  it("should open the lightbox when clicking the image", () => {
    cy.visit("/pages/lightbox.html");
    cy.get(".relative img").should("be.visible").click();
    cy.get("#lightbox").should("be.visible");
  });

  
  it("should close the lightbox when clicking outside", () => {
    cy.visit("../pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();

    cy.get(".bg-black.bg-opacity-60")
      .filter((index, el) => {
        const position = Cypress.$(el).css("position");
        const isVisible = Cypress.$(el).is(":visible");
        return position === "fixed" && isVisible;
      })
      .first()
      .click("topLeft");

    cy.get("#lightbox").should("not.be.visible");
  });

  it("should add a like and update counters", () => {
    cy.visit("../pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();
    cy.get('svg[title="Like"]').click();
    cy.get('svg[title="Dislike"]').should("exist");
    cy.get('[x-text="likesCount"]').should("contain", "1");
  });

  it("should remove a like and update counters", () => {
    cy.visit("../pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();
    cy.get('svg[title="Like"]').click();
    cy.get('svg[title="Dislike"]').click();
    cy.get('svg[title="Like"]').should("exist");
    cy.get('[x-text="likesCount"]').should("contain", "0");
  });
  it("should add a comment and display it", () => {
    cy.visit("../pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();
    cy.get('input[name="comment"]').type("Cypress is awesome!");
    cy.contains("button", "Publish").click();
    cy.contains("Cypress is awesome!").should("exist");
  });

  it("should disable Publish button when input is empty", () => {
    cy.visit("../pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();
    cy.get('input[name="comment"]').clear();
    cy.contains("button", "Publish").should("be.disabled");
  });

  it("should toggle comment visibility", () => {
    cy.visit("/pages/lightbox.html");

    cy.get(".relative img").should("be.visible").click();

    cy.get('input[name="comment"]').type("Test comment");
    cy.contains("button", "Publish").click();

    cy.contains("Test comment").should("exist");

    cy.contains(/Show\s+1\s+comment|Hide\s+1\s+comment/i, {
      timeout: 10000,
    }).click();

    cy.contains(/Show\s+1\s+comment/i).should("exist");
  });

  it("should update the comment counter on overlay and lightbox", () => {
    cy.visit("/pages/lightbox.html");

    cy.get(".relative img").first().should("be.visible").click();

    cy.get('input[name="comment"]').type("Comment overlay test");
    cy.contains("button", "Publish").click();

    cy.get('input[name="comment"]').type("Second comment");
    cy.contains("button", "Publish").click();

    cy.get('[x-text="commentsCount()"]').should("contain", "2");
  });
  it('should show "comment" for 1 and "comments" for more', () => {
    cy.visit("/pages/lightbox.html");
    cy.get(".relative img").should("be.visible").click();

    cy.get('input[name="comment"]').type("One comment");
    cy.contains("button", "Publish").click();

    cy.contains(/Show 1 comment|Hide 1 comment/).should("exist");

    cy.get('input[name="comment"]').type("Second comment");
    cy.contains("button", "Publish").click();

    cy.contains(/Show 2 comments|Hide 2 comments/).should("exist");
  });

  it("should delete the second of three comments", () => {
    cy.visit("/pages/lightbox.html");
    cy.get(".relative img").should("be.visible").click();

    const comments = ["First", "Second", "Third"];
    comments.forEach((text) => {
      cy.get('input[name="comment"]').type(text);
      cy.contains("button", "Publish").click();
    });

    cy.contains(/Show 3 comments|Hide 3 comments/)
      .should("exist")
      .click();

    cy.contains("Second")
      .parent()
      .siblings()
      .find('svg[title="Supprimer le commentaire"]')
      .click();

    cy.contains("Second").should("not.exist");
  });
});
