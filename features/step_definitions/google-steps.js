'use strict';

var {defineSupportCode} = require('cucumber');
var {By, until, Key} = require('selenium-webdriver');
var {expect} = require('chai');

defineSupportCode(function({When, Then}) {

  When(/^I search Google for "([^"]*)"$/, function (searchQuery, next) {
    this.driver.get('http://www.google.co.uk/webhp?complete=0');
    this.driver.findElement(By.name('q'))
      .sendKeys(searchQuery);
    this.driver.findElement(By.name('q'))
      .sendKeys(Key.ENTER)
        .then(function() {
          next();
        });
  });

  Then(/^I should see some results$/, function (next) {
    this.driver.wait(until.elementLocated(By.css('div.g')));
    this.driver.findElements(By.css('div.g'))
      .then(function(elements) {
        expect(elements.length).to.not.equal(0);
        next();
      });
  });

  When(/^I search Google for "cat"$/, function(catName, next) {
    this.driver.get(`https://www.google.com/search?q=cat&oq=cat&aqs=chrome..69i57j0l5.3122j1j7&sourceid=chrome&ie=UTF-8`);
    this.driver.findElement(By.className('cat'))
    .sendKeys(catName);
    this.driver.findElement(By.className('cat'))
    .sendKeys(Key.ENTER)
    .then(function() {
      next();
    });
  });

  Then(/^I should see some cats$/, function(next) {
    this.driver.wait(until.elementLocated(By.className('div.g')));
    this.driver.findElements(By.className('div.g'))
      .then(function(elements) {
        expect(elements.length).to.not.equal(0);
        next();
      });
  });

});


