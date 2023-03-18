import { Button } from '@kanban/client/ui';

export function Index() {
  return (
    <>
      <div className="boxs">
        <p>red</p>
      </div>

      <Button color="purple">Button Primary L</Button>
      <Button color="purple" size="small">
        Button Primary L
      </Button>
      <style jsx>
        {`
          .boxs {
            background-color: var(--color-red);
            width: 40px;
            height: 40px;
          }
        `}
      </style>
    </>
  );
}

export default Index;
