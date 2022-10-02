import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { detailsPage } from '@console/cypress-integration-tests/views/details-page';
import { devNavigationMenu } from '../../constants';
import { eventSourcePO, pagePO } from '../../pageObjects';
import { createForm, navigateTo } from '../../pages';

Given('user is at Deployments page', () => {
  navigateTo(devNavigationMenu.Deployments);
});

When('user clicks on Create Deployment', () => {
  cy.get(pagePO.create)
    .should('be.visible')
    .click();
});

When('user enters name of deployment as {string}', (name: string) => {
  cy.get(eventSourcePO.createPingSource.name)
    .should('be.visible')
    .clear()
    .type(name);
});

When('user selects Strategy type as {string}', (strategy: string) => {
  cy.get('#form-dropdown-formData-deploymentStrategy-type-field')
    .scrollIntoView()
    .should('be.visible')
    .click();
  const strategyType = strategy.replace(/\s/g, '');
  cy.byTestDropDownMenu(strategyType)
    .should('be.visible')
    .click();
});

When('user enters image as {string}', (imageName: string) => {
  cy.get('#form-input-formData-imageName-field')
    .scrollIntoView()
    .should('be.visible')
    .clear()
    .type(imageName);
});

When('user clicks on Create button', () => {
  createForm.clickCreate();
});

Then('user sees {string} deployment created', (name: string) => {
  cy.get(pagePO.breadcrumb)
    .contains('Deployments')
    .should('be.visible');
  detailsPage.titleShouldContain(name);
});
