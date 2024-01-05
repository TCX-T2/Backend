// responseHandler.js

import HistoriqueAction from "../Models/History.schema.js";

const ActionTypes = {
  TYPE1: "Create",
  TYPE2: "Update",
  TYPE3: "Delete",
  TYPE4: "Read",
};

const responseHandler = (req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    // Perform actions before sending the response
    const resourceId =
      req.params.idP || req.params.idR || req.params.id || req.userId;
    const ressourceName = req.baseUrl.split("/")[1];
    console.log("req.baseUrl:", req.baseUrl);
    console.log("ressourceName:", ressourceName);
    const actionType =
      req.method === "POST"
        ? ActionTypes.TYPE1
        : req.method === "PUT"
        ? ActionTypes.TYPE2
        : req.method === "DELETE"
        ? ActionTypes.TYPE3
        : ActionTypes.TYPE4;

    // Add a record to the HistoriqueAction collection
    HistoriqueAction.create({
      RessourceId: resourceId,
      RessourceName: ressourceName,
      actionType,
    });

    // Call the original res.send with the provided body
    originalSend.call(this, body);
  };

  next();
};

export default responseHandler;
