/**
 * Created by Q on 4/1/2015.
 */
'use strict';

describe('myApp.view1 module', function() {

    beforeEach(module('myApp.view_form'));

    describe('view1 controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var view1Ctrl = $controller('ViewFormCtrl');
            expect(view1Ctrl).toBeDefined();
        }));

    });
});