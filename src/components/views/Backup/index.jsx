import React, { Component } from 'react'
import Main from '../../templates/Main'
import aws from 'aws-sdk'


export default class Backup extends Component {
    state = {
        list: [],
        config: {}
    }

    async componentDidMount() {
        await this.loadConfig().then(()=>{
            this.loadObjects()
            this.loadConfig()
        })
    }

    loadConfig = async () => {
        if (localStorage.getItem('config') === null) {
            await localStorage.setItem('config', "")
        }else{
            this.setState({config: localStorage.getItem('config')})
        }
    }   

    loadObjects = async () => {
        try {
            aws.config.setPromisesDependency()
            aws.config.update({
                accessKeyId: "AKIARIOODOKI33WPS56I",
                secretAccessKey: "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",
                region: 'us-east-1'
            });
            const s3 = new aws.S3();
            const response = await s3.listObjectsV2({
                Bucket: this.state.config
            }).promise()
            this.setState({ list: response.Contents })
        } catch (error) {
            console.log("our error: " + error)
        }
    }

    getDate = (date) => {
        var array = []
        var dia = []
        var myJSON = JSON.stringify(date);
        array = myJSON.split('-')
        dia = array[2].split('', 2)
        var newDate = (dia[0] + dia[1] + "/" + array[1] + "/" + array[0].split('"').splice(1))
        return newDate
    }

    getSize = (size) => {
        var calc = (size / 1048576).toFixed(2)
        return calc + " MB"
    }

    renderTable = () => {
        return (
            <table className="table table-striped table-bordered mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Ultima Modificação</th>
                        <th>Tamanho</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows = () => {
        return this.state.list.map(obj => (
            <tr key={obj.Key}>
                <td>{obj.Key}</td>
                <td>{this.getDate(obj.LastModified)}</td>
                <td>{this.getSize(obj.Size)}</td>
            </tr>
        )).reverse()
    }

    render() {
        return (
            <Main>
                {this.renderTable()}
            </Main>
        )
    }
}