import React, { useState, VoidFunctionComponent } from 'react';

type FormJSON = Record<string, any>;

export type ComplexFormProps = {
    onSubmit: (data: FormJSON) => void;
    onCancel: VoidFunction;
}

/*

목적

ComplextForm 컴포넌트는 사용자가 상호작용할 수 있는 간단한 HTML Form 요소를 렌더링 한다.
이 Form은 사용자가 이름과 성을 입력하고 21세 이상인지 확인하도록 요청한다.
사용자가 21세 이상이면 사용자에게 가장 좋아하는 음료가 무엇인지 묻는 또 다른 인풋이 렌더링 된다.
사용자는 Form을 작성한 후 적용 또는 취소를 클릭할 수 있다. App.tsx에서 볼 수 있듯이 두 버튼 모두 ComplexForm으로 전달되는 콜백 함수를 실행한다.
사용자가 제출을 클릭하면 Form 요소를 JSON으로 변환하여 onSubmit 콜백 함수에 전달한다.

*/

const ComplexForm: VoidFunctionComponent<ComplexFormProps> = ({ onSubmit, onCancel }: ComplexFormProps) => {
    const [isOver21, setIsOver21] = useState<boolean>(false);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const form = event.target as HTMLFormElement;
      const data = formToJSON(form.elements);
  
      onSubmit(data);
    };
  
    const handleIsOver21Change = ({
      target,
    }: React.ChangeEvent<HTMLInputElement>) => {
      const checkbox = target as HTMLInputElement;
      setIsOver21(checkbox.checked);
    };

    return (
        <form id="myForm" name="myForm" onSubmit={handleFormSubmit}>
          <h1>Welcome, Zerry</h1>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" />
          </div>
          <div>
            <label htmlFor="is_over_21">Are you at least 21 years old?</label>
            <input
              type="checkbox"
              id="is_over_21"
              name="is_over_21"
              checked={isOver21}
              onChange={handleIsOver21Change}
            />
          </div>
          {isOver21 && (
            <div>
              <label htmlFor="favorite_drink">What's your favorite drink?</label>
              <input type="text" id="favorite_drink" name="favorite_drink" />
            </div>
          )}
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="submit">Apply</button>
        </form>
      );
    };
    
    /**
     * form에 입력한 데이터를 검색해서 JSON 객체로 반환
     */
    const formToJSON = (
      elements: HTMLFormControlsCollection
    ): FormJSON => {
      return Array.from(elements).reduce((data, element: any) => {
        if (element.name) {
          const value = element.type === 'checkbox' ? element.checked : element.value;
          return {
            ...data,
            [element.name]: value
          };
        }
        return { ...data };
      }, {} as FormJSON);
    };
    
    export default ComplexForm;