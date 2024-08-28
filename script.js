class Tableau extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputPrenom: "",
            inputNom: "",
            inputMail: "",
            inputTel: "",
            etudiants: [],
            editingIndex: null,
        }
    }

    //methode ajout etudiants
    // addStudent = (e) => {
    //     e.preventDefault()
    //     console.log("appel de la fonction");
    //     if (!this.state.inputPrenom || !this.state.inputNom || !this.state.inputMail || !this.state.inputTel) {
    //         alert('Veuillez remplir tous les champs');
    //         return;
    //     }
    //     const newStudent = {
    //         prenom: this.state.inputPrenom,
    //         nom: this.state.inputNom,
    //         mail: this.state.inputMail,
    //         tel: this.state.inputTel
    //     }
    //     this.setState({
    //         etudiants: [...this.state.etudiants, newStudent],
    //         inputPrenom: "",
    //         inputNom: "",
    //         inputMail: "",
    //         inputTel: ""
    //     })
    //     console.log("fin fonction");

    // }
    addStudent = () => {
        const { 
            inputPrenom, 
            inputNom, 
            inputMail, 
            inputTel, 
            editingIndex, 
            etudiants
         } = this.state;
        const newEtudiant = { 
            prenom: inputPrenom, 
            nom: inputNom, 
            mail: inputMail, 
            tel: inputTel 
        };

        if (editingIndex !== null) {
            // Mise à jour d'un étudiant existant
            const updatedEtudiants = [...etudiants];
            updatedEtudiants[editingIndex] = newEtudiant;
            this.setState({
                etudiants: updatedEtudiants,
                editingIndex: null
            });
        } else {
            // Ajout d'un nouvel étudiant
            this.setState(prevState => ({
                etudiants: [...prevState.etudiants, newEtudiant]
            }));
        }

        // Réinitialiser les champs du formulaire
        this.setState({
            inputPrenom: '',
            inputNom: '',
            inputMail: '',
            inputTel: ''
        });
    }

    //methode de suppression
    deleteEtudiant = (index) => {
        const copieTab = [...this.state.etudiants]
        copieTab.splice(index, 1)
        { this.setState({ etudiants: copieTab }) }
    }

    // method de modification 
    editEtudiants = (index) => {
        const etudiant = this.state.etudiants[index];
        this.setState({
            inputPrenom: etudiant.prenom,
            inputNom: etudiant.nom,
            inputMail: etudiant.mail,
            inputTel: etudiant.tel,
            editingIndex: index
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row text-center my-3">
                    <p className="fw-semibold t">Jeemacoder gestion utilsateurs</p>
                </div>
                <div className="p-3 d-flex justify-content-center align-items-center">
                    <div className="row shadow p-4">
                        <div>
                            <div className=" d-flex gap-2 mt-3">

                                <div className="">
                                    <input
                                        value={this.state.inputPrenom}
                                        onChange={(e) => {
                                            this.setState({
                                                inputPrenom: e.target.value
                                            })
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="prenom"
                                        aria-label="First name" required />
                                </div>
                                <div className="">
                                    <input
                                        value={this.state.inputNom}
                                        onChange={(e) => {
                                            this.setState({
                                                inputNom: e.target.value
                                            })
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="nom"
                                        aria-label="First name" required />
                                </div>
                            </div>
                            <div className=" d-flex gap-2 mt-3 ">

                                <div className="">
                                    <input
                                        value={this.state.inputMail}
                                        onChange={(e) => {
                                            this.setState({
                                                inputMail: e.target.value
                                            })
                                        }}
                                        type="email"
                                        className="form-control"
                                        placeholder="e-mail"
                                        aria-label="e-mail" required />
                                </div>
                                <div className="">
                                    <input
                                        value={this.state.inputTel}
                                        onChange={(e) => {
                                            this.setState({
                                                inputTel: e.target.value
                                            })
                                        }}
                                        type="number"
                                        className="form-control"
                                        placeholder="téléphone"
                                        aria-label="telephone" required />
                                </div>

                            </div>
                            {/* <button
                                onClick={this.addStudent}
                                className="btn btn-success col-12 mt-2">
                                ajouter
                            </button> */}
                            <button
                                onClick={this.addStudent}
                                className="btn btn-success col-12 mt-2">
                                {this.state.editingIndex !== null ? 'Modifier' : 'Ajouter'}
                            </button>
                            {this.state.editingIndex !== null && (
                                <button
                                    onClick={() => this.setState({ editingIndex: null, inputPrenom: '', inputNom: '', inputMail: '', inputTel: '' })}
                                    className="btn btn-secondary col-12 mt-2">
                                    Annuler
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-center fw-semibold">Utilisateurs</p>
                <table className="table mt-3">


                    <thead>
                        <tr>

                            <th scope="col">Prenom</th>
                            <th scope="col">Nom</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Telephone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.etudiants.map((etudiant, index) => (
                            <tr key={index} className="my-3">
                                <td>{etudiant.prenom}</td>
                                <td>{etudiant.nom}</td>
                                <td>{etudiant.mail}</td>
                                <td>{etudiant.tel}</td>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => this.deleteEtudiant(index)}>
                                    <i className="fa fa-trash"  ></i>
                                </button>
                                <button
                                    className="btn btn-outline-danger ms-4"
                                    onClick={() => this.editEtudiants(index)}>
                                    <i className="fa fa-pen"  ></i>
                                </button>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        )
    }
}
ReactDOM.createRoot(document.getElementById('root')).render(<Tableau />)