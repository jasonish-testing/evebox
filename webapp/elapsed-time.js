/* Copyright (c) 2014 Jason Ish
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

import moment from "moment";

/**
 * This directive presents a timestamp as a duration (how long ago) and
 * periodically updates that duration.
 */

angular.module("app").directive("elapsedTime", elapsedTime);

elapsedTime.$inject = ["$interval"];

function elapsedTime($interval) {

    return {
        restrict: "AE",

        scope: {
            timestamp: "="
        },

        template: "{{duration}}",

        link: function(scope, element) {

            var updateInterval = 60000;

            var intervalId;

            element.on("$destroy", function() {
                $interval.cancel(intervalId);
            });

            var updateDuration = function() {
                var duration = moment(scope.timestamp) - moment();
                scope.duration = moment.duration(duration).humanize(true);
            };
            updateDuration();

            intervalId = $interval(function() {
                updateDuration();
            }, updateInterval);

        }
    }

}