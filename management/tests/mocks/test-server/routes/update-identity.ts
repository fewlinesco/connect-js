import express from "express";

import {
  nonPrimaryIdentityToUpdate,
  nonPrimaryNewIdentity,
  primaryIdentityToUpdate,
} from "../../identities";

const updateIdentityRouter = express.Router();

updateIdentityRouter.post("/", (request, response) => {
  const { body } = request;
  console.log(body);
  switch (body.operationName) {
    case "getUserIdentityQuery":
      if (body.variables.id === nonPrimaryIdentityToUpdate.id) {
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
      } else if (body.variables.id === primaryIdentityToUpdate.id) {
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
    case "addIdentityToUser":
      return response.status(200).json({
        data: {
          addIdentityToUser: {
            ...nonPrimaryNewIdentity,
          },
        },
      });
    case "removeIdentityFromUser":
      return response.status(200).json({
        data: {
          removeIdentityFromUser: {
            identity: {
              value: nonPrimaryIdentityToUpdate.value,
            },
          },
        },
      });
    default:
      return response.status(500).json("BOOM");
  }
});

export default updateIdentityRouter;
