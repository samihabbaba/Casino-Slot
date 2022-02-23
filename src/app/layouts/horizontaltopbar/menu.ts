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
    subItems: [
      {
        id: 24,
        label: "MENUITEMS.CUSTOMERTRANSANSACTION.TEXT1",
        link: "/customer-transaction/slot",
        parentId: 5,
      },

      {
        id: 25,
        label: "MENUITEMS.CUSTOMERTRANSANSACTION.TEXT2",
        link: "/customer-transaction/live",
        parentId: 5,
      },

      {
        id: 26,
        label: "MENUITEMS.CUSTOMERTRANSANSACTION.TEXT3",
        link: "/customer-transaction/complex",
        parentId: 5,
      },
    ],
  },
  // {
  //   id: 6,
  //   label: "MENUITEMS.LIVEDATA.TEXT",
  //   icon: "bxs-data",
  //   subItems: [
  //     {
  //       id: 22,
  //       label: "MENUITEMS.LIVEDATA.TEXT1",
  //       link: "/live-data/sessions",
  //       parentId: 6,
  //     },

  //     {
  //       id: 23,
  //       label: "MENUITEMS.LIVEDATA.TEXT2",
  //       link: "/live-data/close-day",
  //       parentId: 6,
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   label: "MENUITEMS.CHIPTRANSFER.TEXT",
  //   icon: "bx-transfer-alt",
  //   link: "/chip-transfer",
  // },
  // {
  //   id: 8,
  //   label: "MENUITEMS.METERS.TEXT",
  //   icon: "bx-ruler",
  //   link: "/meters",
  // },
  // {
  //   id: 9,
  //   label: "MENUITEMS.CUSTOMER.TEXT",
  //   icon: "bx-user",
  //   link: "/customer",
  // },
  // {
  //   id: 10,
  //   label: "MENUITEMS.STAFF.TEXT",
  //   icon: "bxs-user-badge",
  //   link: "/staff",
  // },
  // {
  //   id: 11,
  //   label: "MENUITEMS.LIVETABLE.TEXT",
  //   icon: "bxs-chalkboard",
  //   link: "/live-table",
  // },
  // {
  //   id: 12,
  //   label: "MENUITEMS.MACHINE.TEXT",
  //   icon: "bxs-bot",
  //   link: "/machine",
  // },
  // {
  //   id: 13,
  //   label: "MENUITEMS.CHIPTYPE.TEXT",
  //   icon: "bx-chip",
  //   link: "/chip-type",
  // },

  // {
  //   id: 14,
  //   label: "MENUITEMS.HOSPITALITY.TEXT",
  //   icon: "bxs-dish",
  //   link: "/hospitality",
  // },

  // {
  //   id: 15,
  //   label: "MENUITEMS.CURRENCY.TEXT",
  //   icon: "bx-pound",
  //   link: "/currency",
  // },

  // {
  //   id: 16,
  //   label: "MENUITEMS.OPENDAY.TEXT",
  //   icon: "bx-calendar-event",
  //   link: "/open-day",
  // },

  // {
  //   id: 17,
  //   label: "MENUITEMS.LOGS.TEXT",
  //   icon: "bxs-log-in-circle",
  //   link: "/logs",
  // },
];
