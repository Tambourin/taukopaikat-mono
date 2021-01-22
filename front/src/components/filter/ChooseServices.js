import React, { useRef } from "react";
import { Segment, Checkbox, Icon, Popup, Grid, Form } from "semantic-ui-react";

const ChooseServices = ({
  filter,
  setDoesNotBelongToChain,
  setIsOpenTwentyFourHours,
  setHasBeenAvarded,
  setIsAttraction,
  setIsSummerCafe,
  setIsGasStation,
  setIsGrill,
  setHasMarketplace
}) => {
  const ref = useRef();

  const scrollToDiv = () => {
    ref.current.scrollIntoView({
      behavior: "smooth"
    });
  }

  return (
    <div ref={ref} onClick={scrollToDiv}>
      <Segment>      
      <Form>
        <Form.Field>
          <label>
            <Popup
              content="Näytä vain taukopaikat joista löytyy valitut palvelut"
              trigger={<Icon name="info circle" />}
            />
            Näiden pitää toteutua:
          </label>
          <Grid doubling columns={8}>
            <Grid.Column>
              <Checkbox
                label="Ei kuulu ketjuun"
                checked={filter.doesNotBelongToChain}
                onClick={setDoesNotBelongToChain}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                label="Auki 24 h"
                checked={filter.isOpenTwentyFourHours}
                onClick={setIsOpenTwentyFourHours}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                label="Palkittu"
                checked={filter.hasBeenAvarded}
                onClick={setHasBeenAvarded}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                label="Nähtävyys"
                checked={filter.isAttraction}
                onClick={setIsAttraction}
              />
            </Grid.Column>
            <Grid.Column>
              <Checkbox
                label="Kesäkahvila"
                checked={filter.isSummerCafe}
                onClick={setIsSummerCafe}
              />
            </Grid.Column>
            <Grid.Column>
            <Checkbox
                label="Polttoainetta"
                checked={filter.isGasStation}
                onClick={setIsGasStation}
              />
            </Grid.Column>        
            <Grid.Column>
              <Checkbox 
                label="Grilli" 
                checked={filter.isGrill} 
                onClick={setIsGrill} />
            </Grid.Column>
            <Grid.Column>
              <Checkbox 
                label="Tuottajatori" 
                checked={filter.hasMarketplace} 
                onClick={setHasMarketplace} />
            </Grid.Column>
          </Grid>
        </Form.Field>
      </Form>
    </Segment>
    </div>    
  );
};

export default ChooseServices;
