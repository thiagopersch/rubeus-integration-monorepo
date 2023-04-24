const globalRoutes = [
  {
    path: "/clients",
    name: "Clientes",
  },
  {
    path: "/tbc",
    name: "TBC",
  },
  {
    path: "/sentences/sentence-category",
    name: "Categorias das consultas",
  },
];

const tbcRoutes = [
  {
    newTbc: {
      path: "/tbc/new",
      name: "Adicionar TBC",
    },
  },
  {
    showTbc: {
      path: "/tbc/[tbc_id]",
      name: "Ver Informações do TBC",
    },
  },
];

export { globalRoutes, tbcRoutes };
