﻿define(['serversync'], function (ServerSync) {
    'use strict';

    function syncNext(connectionManager, apiClients, index, options, resolve, reject) {

        var length = apiClients.length;

        if (index >= length) {

            resolve();
            return;
        }

        var apiClient = apiClients[index];

        console.log("Creating ServerSync to server: " + apiClient.serverId());

        new ServerSync().sync(connectionManager, apiClient, options).then(function () {

            syncNext(connectionManager, apiClients, index + 1, options, resolve, reject);

        }, function () {

            syncNext(connectionManager, apiClients, index + 1, options, resolve, reject);
        });
    }

    function MultiServerSync() {

    }

    MultiServerSync.prototype.sync = function (connectionManager, options) {

        return new Promise(function (resolve, reject) {

            var apiClients = connectionManager.getApiClients();

            syncNext(connectionManager, apiClients, 0, options, resolve, reject);
        });
    };

    return MultiServerSync;
});