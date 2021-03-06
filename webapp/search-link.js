/* Copyright (c) 2015 Jason Ish
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import angular from "angular";

(function() {

    /**
     * Directive to create links to the search page.
     */
    angular.module("app").directive("searchLink", searchLink);

    function searchLink() {

        let template = `<a ui-sref="{{vm.state}}({q: vm.queryString})">{{vm.value}}</a>`;

        return {
            restrict: "AE",
            template: template,
            scope: {
                value: "@",
                field: "@",
                state: "@?"
            },
            controller: controller,
            controllerAs: "vm",
            bindToController: true
        };

        function controller() {

            let vm = this;

            if (!vm.state) {
                vm.state = "events";
            }

            if (!vm.field) {
                vm.queryString = `+"${vm.value}"`;
            }
            else {
                let encodedValue = encodeURIComponent(vm.value);
                vm.queryString = `+${vm.field}:"${encodedValue}"`;
            }
        }
    }

})();