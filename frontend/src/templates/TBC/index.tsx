import { useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Plus } from "@styled-icons/feather";

import AddTbcModal, { TbcModalRef } from "@/components/AddTbcModal";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import SectionContainer from "@/components/SectionContainer";
import TextInput from "@/components/TextInput";
import TbcTable from "@/components/TbcTable";

import { FormattedTbc } from "@/models/tbc";

import { listTbc } from "@/requests/queries/tbc";

import Base from "../Base";

import * as S from "./styles";

const Tbcs = () => {
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const { data: tbc, refetch } = useQuery<FormattedTbc[]>("get-tbc", () =>
    listTbc(session),
  );
  const addTbcModal = useRef<TbcModalRef>(null);

  const searchLowerCase = search.toLowerCase();
  const tbcs = tbc?.filter((value) =>
    value.name.toLowerCase().includes(searchLowerCase),
  );

  return (
    <Base>
      <Card>
        <S.Wrapper>
          <S.WrapperHeading>
            <Heading size="md">TBC cadastrados</Heading>
          </S.WrapperHeading>
          <SectionContainer
            paddings="xsmall"
            display="flex"
            flexDirection="row"
            justifyContent="spaceBetween"
            alignItems="center"
            alignContent="center"
          >
            <S.WrapperSearch>
              <TextInput
                label="Pesquisar..."
                id="search"
                name="search"
                type="search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </S.WrapperSearch>
            <S.WrapperItemsPerPage>
              <Link href="/tbc/new" passHref>
                <Button
                  size="medium"
                  color="primaryColor"
                  sizeLabel="small"
                  labelColor="white"
                  icon={<Plus />}
                >
                  Adicionar TBC
                </Button>
              </Link>
            </S.WrapperItemsPerPage>
          </SectionContainer>
          <SectionContainer paddings="xsmall">
            <TbcTable tbcs={tbcs} />
          </SectionContainer>
        </S.Wrapper>
      </Card>
      <AddTbcModal refetchFn={refetch} ref={addTbcModal} />
    </Base>
  );
};

export default Tbcs;
