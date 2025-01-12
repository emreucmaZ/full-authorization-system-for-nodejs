const Permission = require("../../models/Permission");
const Role = require("../../models/Role");
const RolePermission = require("../../models/RolePermission");
const sendResponse = require("../exception/sendResponse");
const mongoose = require("mongoose");

async function getUserPermissions(roleId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      throw new Error('Invalid roleId');
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return [];
    }

    const permissions = await RolePermission.find({ roleId });
    if (permissions.length === 0) {
      return [];
    }

    // Using Promise.all to handle multiple async calls inside the map
    const rolePermissions = await Promise.all(
      permissions.map(async (permission) => {
        try {
          const rolePermission = await Permission.findById(permission.permissionId)
          return rolePermission.name;
        } catch (error) {
          console.error("Error fetching permission:", error);
          return null;
        }
      })
    );

    // Filter out any null results (failed permission fetch)
    return rolePermissions.filter(permission => permission !== null);
  } catch (error) {
    console.error("Error in getUserPermissions:", error);
    return [];
  }
}

module.exports = getUserPermissions;
