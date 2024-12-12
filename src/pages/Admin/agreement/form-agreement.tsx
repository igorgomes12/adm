import { ModalDadosGeraisDoAcordo } from "@/components/modules/admin/agreement/data/models/modal-dados-gerais-do-acordo";
import { ModalFormasDePagamento } from "@/components/modules/admin/agreement/data/models/modal-formas-de-pagamento";
import { ModalSituacaoPagamento } from "@/components/modules/admin/agreement/data/models/modal-situacao-pagamento";
import { ModalResponsavelAcordo } from "@/components/modules/admin/agreement/data/models/responsavel-acordo";
import { AgreementNavComponent } from "@/components/modules/admin/agreement/data/nav";
import { useState } from "react";
import { useParams } from "react-router";

export const FormAgreement = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedForm, setSelectedForm] = useState<string>(
    "Dados Gerais do acordo"
  );
  const [enabledForms, setEnabledForms] = useState<string[]>([
    "Dados Gerais do acordo",
  ]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [formData, setFormData] = useState<any>({});

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const handleNext = (currentForm: string, data: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setFormData((prevData: any) => ({
      ...prevData,
      [currentForm.toLowerCase()]: data,
    }));

    const forms = [
      "Dados Gerais do acordo",
      "Responsavel pelo acordo",
      "Formas de pagamento",
      "Situação dos pagamentos",
    ];
    const nextFormIndex = forms.indexOf(currentForm) + 1;

    if (nextFormIndex < forms.length) {
      const nextFormTitle = forms[nextFormIndex];
      if (!enabledForms.includes(nextFormTitle)) {
        setEnabledForms((prev) => [...prev, nextFormTitle]);
      }
      setSelectedForm(nextFormTitle);
    } else {
      // if (id) {
      //   updateRepresentativeMutation.mutate(formData);
      // } else {
      //   createRepresentativeMutation.mutate(formData);
      // }
    }
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "Dados Gerais do acordo":
        return (
          <ModalDadosGeraisDoAcordo
            initialValues={formData}
            onNext={(data) => handleNext("Dados Gerais do acordo", data)}
          />
        );
      case "Responsavel pelo acordo":
        return (
          <ModalResponsavelAcordo
            initialValues={formData}
            onNext={(data) => handleNext("Responsavel pelo acordo", data)}
          />
        );
      case "Formas de pagamento":
        return (
          <ModalFormasDePagamento
            initialValues={formData}
            onNext={(data) => handleNext("Formas de pagamento", data)}
          />
        );
      case "Situação dos pagamentos":
        return (
          <ModalSituacaoPagamento
            initialValues={formData}
            onNext={(data) => handleNext("Situação dos pagamentos", data)}
          />
        );
      default:
        return <div>Selecione uma opção para ver o formulário.</div>;
    }
  };

  return (
    <div className="flex px-2">
      <aside className="w-96 bg-gray-100 h-screen items-center flex overscroll-none flex-col space-y-6">
        <h2 className="text-2xl font-semibold p-2">
          {id ? "Editar Acordo" : "Cadastro Acordo"}
        </h2>
        <AgreementNavComponent
          selected={selectedForm}
          onSelect={(title) => {
            if (enabledForms.includes(title)) {
              setSelectedForm(title);
            }
          }}
        />
      </aside>
      <main className="flex-1 bg-white">{renderForm()}</main>
    </div>
  );
};
