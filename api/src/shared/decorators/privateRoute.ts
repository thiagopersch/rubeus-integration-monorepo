// import ensureAuthenticated from '@modules/gusers/infra/http/middlewares/ensureAuthenticated';
// import ensureModuleAccess from '@modules/core/infra/http/middlewares/ensureModuleAccess';

// type PrivateRouteProps = {
//   MODULE: string;
//   RULE?: 'READ' | 'WRITE';
// };

// function privateRoute(params?: PrivateRouteProps) {
//   return (
//     target: any,
//     propertyKey: string,
//     propertyDescriptor: PropertyDescriptor,
//   ): PropertyDescriptor => {
//     const originalMethod = propertyDescriptor.value;

//     // eslint-disable-next-line no-param-reassign
//     propertyDescriptor.value = async function newMethod(...args: any) {
//       const { profileId } = await ensureAuthenticated.apply(this, args);

//       if (params) {
//         const { MODULE, RULE } = params;

//         await ensureModuleAccess({
//           MODULE,
//           RULE,
//           GUSERPROFILE_ID: profileId,
//         });
//       }

//       return originalMethod.apply(this, args);
//     };

//     return propertyDescriptor;
//   };
// }

// export default privateRoute;
