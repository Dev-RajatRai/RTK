import React from "react";
import { Skeleton, Card, CardContent } from "@mui/material";

const SkeletonProductCard = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <CardContent>
        <Skeleton variant="text" width="80%" height={30} />
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="50%" height={20} />
      </CardContent>
    </Card>
  );
};

export default SkeletonProductCard;
