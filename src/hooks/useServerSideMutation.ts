import React from "react";
import { useMutation } from "@tanstack/react-query";

type Props = {};

const useServerSideMutation = (props: Props) => {
  const mutationFn = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    return {};
  };
};

export default useServerSideMutation;
