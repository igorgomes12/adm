import { SkeletonCard } from "@/components/skeleton-component/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { FC } from "react";

export const LoadingRow: FC = () => (
  <TableRow>
    <TableCell colSpan={8}>
      <SkeletonCard />
    </TableCell>
  </TableRow>
);
