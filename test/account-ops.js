'use strict';

var SalesforceIQ = require('../index.js');

var util = require('util');
var assert = require('assert');
var uid = require('uid');
var _ = require('lodash');

var apiKey = process.env['SALESFORCEIQ_KEY'];
var apiSecret = process.env['SALESFORCEIQ_SECRET'];

describe('SalesforceIQ Account Operations', function() {
  var salesforceIQ = new SalesforceIQ(apiKey, apiSecret);
  var accountId = null;
  var companyName = 'Test - Sigma Software';
  var companyNameUpdated = 'Test - Sigma Software: Updated';
  var contactName = 'User Leslie';
  var contactEmail = 'leslie@test.sigmasofware.com';
  var contactId = null;
  var listPeopleId = null;
  var listLicensesId = null;
  var listLicensesItem = null;
  var listLicensesItemId = null;
  var listAccountzId = null;
  var listAccountzItemId = null;

  it('can the fields for account', function(done) {
    salesforceIQ.getAccountFields(function(err, data) {
      assert.ifError(err);
      assert.ok(data.fields);

      done();
    });
  });

  it('can create an account', function(done) {
    salesforceIQ.createAccount({
      name: companyName
    }, function(err, data) {
      assert.ifError(err);
      assert.equal(data.name, companyName);
      assert.ok(data.id);

      // Set the account id to retrieve in future tests
      accountId = data.id;
      done();
    });
  });

  it('can retrieve the account', function(done) {
    salesforceIQ.getAccount(accountId, function(err, data) {
      assert.ifError(err);
      assert.equal(data.name, companyName);
      assert.ok(data.id);

      done();
    });
  });

  it('can update the account', function(done) {
    salesforceIQ.updateAccount(accountId, { id: accountId, name: companyNameUpdated }, function(err, data) {
      assert.ifError(err);
      assert.equal(data.name, companyNameUpdated);
      assert.ok(data.id);

      done();
    });
  });

  it('should delete an account', function(done) {
    salesforceIQ.deleteAccount(accountId, function(err, data) {
      assert.ifError(err);
      // REF print(err, data);

      done();
    });
  });

});
