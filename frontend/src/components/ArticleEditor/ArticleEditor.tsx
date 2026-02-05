import React from 'react';
import { store } from '../../state/store';
import { useStore } from '../../state/storeHooks';
import { buildGenericFormField } from '../../types/genericFormField';
import { ContainerPage } from '../ContainerPage/ContainerPage';
import { GenericForm } from '../GenericForm/GenericForm';
import { addTag, EditorState, removeTag, setCoAuthorIds, updateField } from './ArticleEditor.slice';

export function ArticleEditor({ onSubmit }: { onSubmit: (ev: React.FormEvent) => void }) {
  const { article, submitting, tag, errors, users } = useStore(({ editor }) => editor);

  return (
    <div className='editor-page'>
      <ContainerPage>
        <div className='col-md-10 offset-md-1 col-xs-12'>
          <GenericForm
            formObject={{ ...article, tag } as unknown as Record<string, string | null>}
            disabled={submitting}
            errors={errors}
            onChange={onUpdateField}
            onSubmit={onSubmit}
            submitButtonText='Publish Article'
            onAddItemToList={onAddTag}
            onRemoveListItem={onRemoveTag}
            fields={[
              buildGenericFormField({ name: 'title', placeholder: 'Article Title' }),
              buildGenericFormField({ name: 'description', placeholder: "What's this article about?", lg: false }),
              buildGenericFormField({
                name: 'body',
                placeholder: 'Write your article (in markdown)',
                fieldType: 'textarea',
                rows: 8,
                lg: false,
              }),
              buildGenericFormField({
                name: 'tag',
                placeholder: 'Enter the tag name and press enter',
                listName: 'tagList',
                fieldType: 'list',
                lg: false,
              }),
              // BASIC: CSV of emails
              buildGenericFormField({
                name: 'coAuthorEmailsCsv',
                placeholder: 'Co-Authors (comma-separated emails)',
                lg: false,
              }),
            ]}
          />
          {/* ADVANCED: simple multi-select of users */}
          <div className='form-group'>
            <label>Co-Authors (advanced)</label>
            <select
              multiple
              className='form-control'
              disabled={submitting}
              value={(article.coAuthorIds || []).map(String)}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions).map((o) => Number(o.value));
                store.dispatch(setCoAuthorIds(selected));
              }}
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.username}
                </option>
              ))}
            </select>
          </div>
        </div>
      </ContainerPage>
    </div>
  );
}

function onUpdateField(name: string, value: string) {
  store.dispatch(
    updateField({ name: name as 'tag' | 'title' | 'description' | 'body' | 'coAuthorEmailsCsv', value }),
  );
}

function onAddTag() {
  store.dispatch(addTag());
}

function onRemoveTag(_: string, index: number) {
  store.dispatch(removeTag(index));
}
