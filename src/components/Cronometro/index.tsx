import Botao from "../Botao";
import Relogio from "./Relogio";
import style from  "./Cronometro.module.scss";
import { tempoParaSegundos } from "../../common/utils/time";
import { ITarefa } from "../../Types/tarefa";
import { useEffect, useState } from "react";


interface Props{
    selecionado: ITarefa | undefined,
    finalizarTarefa: () => void
}

export default function Cronometro({selecionado, finalizarTarefa}: Props){
    const [tempo, setTempo] = useState<number>();

    //useEffect é um hook 'observable' do ciclo de vida de um componente que especificamos e sempre que ele mudar seu estado, executa uma função fazendo alguma alteração . O primeiro parâmetro é uma função - que é a função a ser executada quando alguma coisa mudar - e o segundo é um array de dependências - todas as variáveis que queremos que o useEffect utilize como base para executar essa função.
    useEffect(() => {
        if(selecionado?.tempo){
            setTempo(tempoParaSegundos(selecionado.tempo));
        }
    },[selecionado]);

    function regressiva(contador: number = 0) {
        setTimeout(() => {
            if(contador > 0){
                setTempo(contador -1);
                return regressiva(contador - 1);
            }
            finalizarTarefa();
        }, 1000);
    }


    return(
        <div className={style.cronometro}>
            <p className={style.titulo}>
                Escolha um card e inicie o cronômetro
            </p>
            <div className={style.relogioWrapper}>
                <Relogio tempo={tempo} />
            </div>
            <Botao 
                type="button" 
                onClick={()=> regressiva(tempo)}
            >
                Começar!
            </Botao>
        </div>
    )
}