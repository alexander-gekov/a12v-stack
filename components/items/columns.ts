import type { ColumnDef } from "@tanstack/vue-table";
import type { Item } from "../../types/item";
import { h } from "vue";
import DataTableDropdown from "./data-table-dropdown.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "../ui/button";
import Badge from "../ui/badge/Badge.vue";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    size: 50,
    minSize: 50,
    maxSize: 50,
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    enableResizing: true,
    accessorKey: "name",
    size: 300,
    minSize: 300,
    maxSize: 500,
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    enableResizing: true,
    size: 300,
    minSize: 300,
    maxSize: 500,
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.getValue("description"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Item["status"];

      return h(
        Badge,
        {
          variant:
            status === "published"
              ? "default"
              : status === "draft"
                ? "secondary"
                : "outline",
        },
        status
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return h(
        Button,
        {
          size: "xs",
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Created", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
    sortingFn: "datetime",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DataTableDropdown, {
          item,
        })
      );
    },
  },
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};
