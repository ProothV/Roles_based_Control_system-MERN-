import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { getRoles } from '../Services/roleService';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const fetchPermissions = async () => {
      if (user && token) {
        try {
          const roles = await getRoles();
          const userRole = roles.find((role) => role.id === user.roleId);
          if (userRole) {
            const perms = {};
            userRole.permissions.forEach((perm) => {
              perms[perm.module] = {
                can_read: perm.can_read,
                can_create: perm.can_create,
                can_update: perm.can_update,
                can_delete: perm.can_delete,
              };
            });
            setPermissions(perms);
          }
        } catch (error) {
          console.error('Failed to fetch permissions:', error);
          setPermissions({});
        }
      } else {
        setPermissions({});
      }
    };
    fetchPermissions();
  }, [user, token]);

  const hasPermission = (module, action) => {
    return permissions[module]?.[action] || false;
  };

  return (
    <RoleContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
};