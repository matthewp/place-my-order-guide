import QUnit from 'steal-qunit';
import F from 'funcunit';
import $ from 'jquery';
import stache from 'can/view/stache/';
import { ViewModel } from './new';

F.attach(QUnit);

// ViewModel unit tests
QUnit.module('app/order/new ViewModel');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the app-order-new component');
});

// Component functional unit tests
QUnit.module('app/order/new Component');

const template = stache(`<app-order-new></app-order-new>`);

QUnit.test('Component works', function(){
  $('#qunit-fixture').html(template({}));
  F('app-order-new').exists('Component initialized');
  F('app-order-new').html('<p>This is the app-order-new component</p>',
    'Component has text');
});
