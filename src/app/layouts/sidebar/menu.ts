import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.DASHBOARDS.TEXT",
    icon: "bx-home-circle",
    link: "/dashboard",
  },

  {
    id: 2,
    label: "MENUITEMS.SLOTTRANSANSACTION.TEXT",
    icon: "bxs-component",
    link: "/slot-transaction",
  },

  {
    id: 3,
    label: "MENUITEMS.LIVETRANSANSACTION.TEXT",
    icon: "bx-broadcast",
    link: "/live-transaction",
  },

  {
    id: 4,
    label: "MENUITEMS.CASETRANSANSACTION.TEXT",
    icon: "bx-briefcase-alt-2",
    subItems: [
      {
        id: 18,
        label: "MENUITEMS.CASETRANSANSACTION.TEXT1",
        link: "/case/transactions",
        parentId: 4,
      },

      {
        id: 19,
        label: "MENUITEMS.CASETRANSANSACTION.TEXT2",
        link: "/case/money-exchange",
        parentId: 4,
      },

      {
        id: 20,
        label: "MENUITEMS.CASETRANSANSACTION.TEXT3",
        link: "/case/drops",
        parentId: 4,
      },

      {
        id: 21,
        label: "MENUITEMS.CASETRANSANSACTION.TEXT4",
        link: "/case/chip",
        parentId: 4,
      },
    ],
  },
  {
    id: 5,
    label: "MENUITEMS.CUSTOMERTRANSANSACTION.TEXT",
    icon: "bxs-user-detail",
    link: "/customer-transaction",
  },
  {
    id: 6,
    label: "MENUITEMS.LIVEDATA.TEXT",
    icon: "bxs-data",
    link: "/live-data",
  },
  {
    id: 7,
    label: "MENUITEMS.CHIPTRANSFER.TEXT",
    icon: "bx-transfer-alt",
    link: "/chip-transfer",
  },
  {
    id: 8,
    label: "MENUITEMS.METERS.TEXT",
    icon: "bx-ruler",
    link: "/meters",
  },
  {
    id: 9,
    label: "MENUITEMS.CUSTOMER.TEXT",
    icon: "bx-user",
    link: "/customer",
  },
  {
    id: 10,
    label: "MENUITEMS.STAFF.TEXT",
    icon: "bxs-user-badge",
    link: "/staff",
  },
  {
    id: 11,
    label: "MENUITEMS.LIVETABLE.TEXT",
    icon: "bxs-chalkboard",
    link: "/live-table",
  },
  {
    id: 12,
    label: "MENUITEMS.MACHINE.TEXT",
    icon: "bxs-bot",
    link: "/machine",
  },
  {
    id: 13,
    label: "MENUITEMS.CHIPTYPE.TEXT",
    icon: "bx-chip",
    link: "/chip-type",
  },

  {
    id: 14,
    label: "MENUITEMS.HOSPITALITY.TEXT",
    icon: "bxs-dish",
    link: "/hospitality",
  },

  {
    id: 15,
    label: "MENUITEMS.CURRENCY.TEXT",
    icon: "bx-pound",
    link: "/currency",
  },

  {
    id: 16,
    label: "MENUITEMS.OPENDAY.TEXT",
    icon: "bx-calendar-event",
    link: "/open-day",
  },

  {
    id: 17,
    label: "MENUITEMS.LOGS.TEXT",
    icon: "bxs-log-in-circle",
    link: "/logs",
  },
];
