import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Dialog, Classes } from "@blueprintjs/core";
import { isPermitted } from "pages/Applications/permissionHelpers";

const StyledDialog = styled(Dialog)`
  && {
    background: white;
    & .bp3-dialog-footer-actions {
      display: block;
    }
  }
`;

const TriggerWrapper = styled.div``;

type FormDialogComponentProps = {
  isOpen?: boolean;
  orgId?: string;
  title: string;
  Form: any;
  trigger: ReactNode;
  permissionRequired?: string;
  permissions?: string[];
};

export const FormDialogComponent = (props: FormDialogComponentProps) => {
  const [isOpen, setIsOpen] = useState(!!props.isOpen);

  const onClose = () => {
    setIsOpen(false);
  };

  const Form = props.Form;

  if (
    props.permissions &&
    props.permissionRequired &&
    !isPermitted(props.permissions, props.permissionRequired)
  )
    return null;

  return (
    <React.Fragment>
      <TriggerWrapper onClick={() => setIsOpen(true)}>
        {props.trigger}
      </TriggerWrapper>

      <StyledDialog
        canOutsideClickClose={false}
        canEscapeKeyClose={false}
        title={props.title}
        onClose={onClose}
        isOpen={isOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          <Form
            onCancel={onClose}
            orgId={props.orgId ? props.orgId : undefined}
          />
        </div>
      </StyledDialog>
    </React.Fragment>
  );
};

export default connect()(FormDialogComponent);
