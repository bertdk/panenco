import React from 'react';
import { SelectInput, Row, Col } from 'components';
import SelectInputDocs from 'components/select/DOCS.md';
import README from 'components/select/README.md';
import { decorator } from '../../utils/decorator';
import { WrappedComponent } from '../helpers/wrapped';

const options = [
  { label: 'Chip', value: 'Chip_1' },
  { label: 'Chip', value: 'Chip_2' },
  {
    label: 'Group 1',
    options: [
      { label: 'G1-Option 1', value: 'G1-Option _1' },
      { label: 'G1-option 2', value: 'G1-Option _2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { label: 'G2-Option 1 ', value: 'G2-Option_1' },
      { label: 'G2-Option 2', value: 'G2-Option_2' },
      { label: 'G2-Option 3', value: 'G2-Option_3' },
    ],
  },
];

export default decorator('Select', SelectInputDocs, README).add('Select component', () => {
  return (
    <WrappedComponent style={{ minHeight: '500px' }}>
      <Row style={{ justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <Col s="2" m="4" l="4">
          <SelectInput
            options={options}
            title="Single Select"
            subTitle="Sub title"
            placeholder="Choose one option ..."
          />
        </Col>
        <Col s="2" m="4" l="4">
          <SelectInput
            options={options}
            title="Multi Select"
            subTitle="Sub title"
            isMulti
            chipIconSize={8}
            placeholder="Choose many options ..."
          />
        </Col>
      </Row>
      <Row style={{ justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <Col s="2" m="3" l="4">
          <SelectInput title="Select with Error" error="Error options" />
        </Col>
        <Col s="2" m="3" l="4">
          <SelectInput placeholder="Disabled" isDisabled />
        </Col>
      </Row>
    </WrappedComponent>
  );
});
