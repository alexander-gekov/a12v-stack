import type { ColumnDef } from "@tanstack/vue-table";
import type { Item } from "../../types/item";
import { h } from "vue";

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
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
        "Badge",
        {
          variant:
            status === "published"
              ? "success"
              : status === "draft"
                ? "secondary"
                : "destructive",
        },
        status
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return h("div", { class: "flex items-center justify-end" }, [
        h(
          "DropdownMenu",
          {},
          {
            default: () => [
              h("DropdownMenuTrigger", { asChild: true }, () =>
                h(
                  "Button",
                  {
                    variant: "ghost",
                    class: "h-8 w-8 p-0",
                  },
                  () => [
                    h("span", { class: "sr-only" }, "Open menu"),
                    h("MoreHorizontal", { class: "h-4 w-4" }),
                  ]
                )
              ),
              h("DropdownMenuContent", { align: "end" }, () => [
                h("DropdownMenuItem", {}, () => "Edit"),
                h("DropdownMenuItem", {}, () => "Duplicate"),
                h("DropdownMenuSeparator"),
                h(
                  "DropdownMenuItem",
                  { class: "text-destructive" },
                  () => "Delete"
                ),
              ]),
            ],
          }
        ),
      ]);
    },
  },
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};
