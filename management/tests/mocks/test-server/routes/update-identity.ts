import express from "express";

import {
  nonPrimaryIdentityToUpdate,
  nonPrimaryNewIdentity,
  primaryIdentityToUpdate,
  primaryNewIdentity,
} from "../../identities";

const updateIdentityRouter = express.Router();

updateIdentityRouter.post("/", (request, response) => {
  const { variables, operationName } = request.body;

  switch (operationName) {
    case "getUserIdentityQuery":
      if (variables.id === nonPrimaryIdentityToUpdate.id) {
        return response.status(200).json({
          data: {
            provider: {
              user: {
                identity: {
                  ...nonPrimaryIdentityToUpdate,
                },
              },
            },
          },
        });
      } else if (variables.id === primaryIdentityToUpdate.id) {
        return response.status(200).json({
          data: {
            provider: {
              user: {
                identity: {
                  ...primaryIdentityToUpdate,
                },
              },
            },
          },
        });
      } else {
        return response.status(500).json("Something's wrong");
      }
    case "checkVerificationCodeQuery":
      if (variables.eventId === "nonPrimaryEventId") {
        return response.status(200).json({
          data: {
            checkVerificationCode: {
              identityType: nonPrimaryNewIdentity.type,
              identityValue: nonPrimaryNewIdentity.value,
              nonce: "nonce",
              status: "VALID",
            },
          },
        });
      } else if (variables.eventId === "primaryEventId") {
        return response.status(200).json({
          data: {
            checkVerificationCode: {
              identityType: primaryNewIdentity.type,
              identityValue: primaryNewIdentity.value,
              nonce: "nonce",
              status: "VALID",
            },
          },
        });
      } else {
        return response.status(500).json("Something's wrong");
      }
    case "addIdentityToUser":
      if (variables.value === nonPrimaryNewIdentity.value) {
        return response.status(200).json({
          data: {
            addIdentityToUser: {
              ...nonPrimaryNewIdentity,
            },
          },
        });
      } else if (variables.value === primaryNewIdentity.value) {
        return response.status(200).json({
          data: {
            addIdentityToUser: {
              ...primaryNewIdentity,
            },
          },
        });
      } else {
        return response.status(500).json("Something's wrong");
      }
    case "removeIdentityFromUser":
      if (variables.value === nonPrimaryIdentityToUpdate.value) {
        return response.status(200).json({
          data: {
            removeIdentityFromUser: {
              identity: {
                value: nonPrimaryIdentityToUpdate.value,
              },
            },
          },
        });
      } else if (variables.value === primaryIdentityToUpdate.value) {
        return response.status(200).json({
          data: {
            removeIdentityFromUser: {
              identity: {
                value: primaryIdentityToUpdate.value,
              },
            },
          },
        });
      } else {
        return response.status(500).json("Something's wrong");
      }
    case "markIdentityAsPrimary":
      if (variables.identityId === primaryNewIdentity.id) {
        return response.status(200).json({
          data: {
            markIdentityAsPrimary: {
              ...primaryNewIdentity,
              primary: true,
            },
          },
        });
      } else {
        return response.status(500).json("Something's wrong");
      }
    default:
      return response.status(500).json("No corresponding operation name found");
  }
});

export default updateIdentityRouter;
