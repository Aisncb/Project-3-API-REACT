import { Alert, Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import './AddClassroom.css';
import { useEffect, useState } from 'react';
import { createClassroom } from '../../../services/classroom';
import { useNavigate } from 'react-router-dom';
import { getAllBuildings } from '../../../services/building';

function AddClassroom() {
  useEffect(() => {
    getBuildingsAvailable();
  }, []);

  async function getBuildingsAvailable() {
    // API request with which we will get the list of buildings
    // available:
    const { buildings } = await getAllBuildings();
    // Storing the different pieces of equipment:
    setBuildingsRegistered(buildings);
  }

  const [buildingsRegistered, setBuildingsRegistered] = useState([]),
    [classroomName, setClassroomName] = useState(''),
    [classroomNameMsg, setClassroomNameMsg] = useState(''),
    [classroomCapacity, setClassroomCapacity] = useState(null),
    [classroomAimedAt, setClassroomAimedAt] = useState(null),
    [classroomBuildingId, setClassroomBuildingId] = useState(null),
    [isError, setIsError] = useState(false),
    [classroomRegistered, setClassroomRegistered] = useState(false),
    [errorMsg, setErrorMsg] = useState({}),
    navigate = useNavigate(),
    handleNavigate = () => {
      navigate("/dashboard");
    },
    handleNameChange = (e) => {
      setClassroomName(e.target.value);
    },
    handleCapacityChange = (e) => {
      setClassroomCapacity(e.target.value);
    },
    handleSelectAimedAtChange = (e) => {
      setClassroomAimedAt(e.target.value);
    },
    handleSelectBuildingChange = (e) => {
      setClassroomBuildingId(e.target.value);
    },
    handleClick = async (e) => {
      e.preventDefault();

      if (classroomName === '') {
        setClassroomNameMsg('Error. +Info: El campo «Denominación» es de obligada cumplimentación.');
      } else {
        try {
          setClassroomNameMsg('');
          await createClassroom({ classroomName: classroomName, capacity: classroomCapacity, aimedAt: classroomAimedAt, buildingId: classroomBuildingId });
          setClassroomName('');
          setClassroomRegistered(true);
          setIsError(false);
        } catch (error) {
          console.log(error)
          setIsError(true);
          setErrorMsg(error);
        }
      }
    }

  return (
    <Box sx={{
      alignItems: 'center',
      display: 'flex',
      height: '80vh',
      justifyContent: 'center',
    }}>
      <Card
        raised={true}
        component={'form'}
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#c3d2fc', height: '50vh', width: '50vw' }}
      >
        <CardHeader titleTypographyProps={{ fontWeight: 'bold', fontSize: 30, borderBottom: '1px solid black', textAlign: 'center' }} title="Alta de aula"></CardHeader>
        <CardContent>

          <TextField
            className="textfield"
            onChange={handleNameChange}
            type="text"
            label="Denominación"
            margin="dense"
            title='Por favor, introduzca el nombre del aula que desea dar de alta'
            required
            fullWidth={true}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

          {classroomNameMsg.includes('Error') && <Alert severity="error">{classroomNameMsg}</Alert>}

          <TextField
            className="textfield"
            onChange={handleCapacityChange}
            type="number"
            label="Aforo"
            margin="dense"
            title='Por favor, seleccione el aforo del aula que desea dar de alta (valor mínimo: 10 — valor máximo: 50)'
            fullWidth={true}
            InputProps={{ inputProps: { min: 10, max: 50 } }}
            InputLabelProps={{ style: { color: 'black', fontWeight: 'bolder', fontSize: 20 } }}
            variant="filled"
          ></TextField>

        </CardContent>

        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 300 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Dirigida a</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el público al que está dirigido el aula que desea dar de alta'
            labelId="simple-select-aimedat-label"
            id="simple-select"
            value={classroomAimedAt === null ? '' : classroomAimedAt}
            label="Dirigida a"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectAimedAtChange}
          >
            <MenuItem value={'student'}>Alumnado</MenuItem>
            <MenuItem value={'professor'}>Profesorado</MenuItem>
          </Select>
        </FormControl>

        <FormControl size='large' sx={{ marginBottom: 1, marginLeft: 2, marginTop: 1, width: 300 }}>
          <InputLabel style={{ color: 'black', fontWeight: 'bolder', fontSize: 20 }} id="demo-simple-select-label">Edificio de ubicación</InputLabel>
          <Select
            title='Por favor, despliegue y seleccione el edificio donde estará ubicado el aula'
            labelId="simple-select-building-label"
            id="simple-select"
            value={classroomBuildingId === null ? '' : classroomBuildingId}
            label="Edificio ubicacion"
            sx={{ backgroundColor: 'white' }}
            onChange={handleSelectBuildingChange}
          >
            {/* Dynamic generation of select option depending on the buildings already registered on the database: */}
            {buildingsRegistered.map(building => {
              return <MenuItem key={building.id} value={building.id}>{building.buildingName} (ID: {building.id})</MenuItem>
            })}
          </Select>
        </FormControl>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClick}
            size="large"
            variant="contained"
            sx={{ backgroundColor: 'black' }}
          >
            Dar de alta
          </Button>
        </CardActions>

        {isError && <Alert severity="error">Se ha producido un error interno al intentar dar de alta el aula {classroomName}. +Info: {errorMsg.data}</Alert>}
        {classroomRegistered && <Alert severity="success">Formulario cumplimentado correctamente.</Alert>}

        {classroomRegistered && <Dialog
          style={{ position: 'absolute', left: 500, top: 100 }}
          open={classroomRegistered}
          onClose={handleNavigate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Registro de aula"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              El aula se ha registrado correctamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNavigate}>Cerrar</Button>
          </DialogActions>
        </Dialog>}
      </Card>

    </Box>
  )
}

export default AddClassroom