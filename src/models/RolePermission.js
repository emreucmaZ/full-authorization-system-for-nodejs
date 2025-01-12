const mongoose = require('mongoose');

// Şema Tanımı
const rolePermissionSchema = mongoose.Schema({
  roleId: { type: String, required: true },
  permissionId: { type: String, required: true }
});

// Bileşik Anahtar için İndeks
rolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true });

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

RolePermission.syncIndexes();

module.exports = RolePermission;
