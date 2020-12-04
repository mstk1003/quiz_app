import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {
            userId: 'mameta',
            userName: 'まめた',
            password: 'mameta',
            // TODO あとでfalseに戻す
            auth: false
        },
        userInfos: [{
            userId: 'mameta',
            userName: 'まめた',
            password: 'mameta',
            // TODO あとでfalseに戻す
            auth: false
        }],
        results: [
            {
                question: String,
                isCorrect: Boolean,
                yourAnswer: String,
                correctAnswer: String
            }
        ],
        records: [{
            userId: String,
            difficulty: String,
            categoryId: String,
            categoryName: String,
            score: Number,
            respondedNumber: Number
        }],
        modes: [
            {
                label: 'Easy',
                difficulty: 'easy'
            },
            {
                label: 'Medium',
                difficulty: 'medium'
            },
            {
                label: 'Hard',
                difficulty: 'hard'
            }
        ]
    },
    mutations: {
        registerUserInfo (state, payload) {
            // TODO 同じIDがすでにあれば登録しない
            if(state.userInfos.some(user => user.userId !== payload.userId)){
                state.userInfos.push(
                    {
                        userId: payload.userId,
                        userName: payload.userName,
                        password: payload.password,
                        auth: payload.auth
                    }
                )
            } else {
                window.alert("入力したユーザーIDはすでに存在します")
            }
        },
        resetUserInfo(state){
            state.userInfo = Array;
        },
        authenticateUser(state, payload){
            const user = state.userInfos.find(user => user.userId === payload.userId);
            const index = state.userInfos.findIndex(user => user.userId === payload.userId);
            if(index !== -1) {
                console.log("idが一致するユーザー情報あり")
                if( user.password === payload.password ) {
                    console.log("passwardが一致するユーザー情報あり")
                    state.userInfo.userName = payload.Name,
                    state.userInfo.userId = payload.userId,
                    state.userInfo.password = payload.password,
                    state.userInfo.auth = true
                }
            } else {
                window.alert("ユーザー情報が見つかりません。サインアップしてください。")
            }
        },
        registerResult(state, payload){
            state.results.push(
                {
                    question: payload.question,
                    isCorrect: payload.isCorrect,
                    yourAnswer: payload.yourAnswer,
                    correctAnswer: payload.correctAnswer
                }
            );
        },
        resetResults(state){
            state.results = [];
        },
        registerRecord(state, payload) {
            let recordIndex = _.findIndex(this.state.records, {
                userId: payload.userId,
                difficulty: payload.difficulty,
                categoryId: payload.categoryId
            });
            if (recordIndex===-1){
                console.log("新規レコードを作成します")
                state.records.push(
                    {
                        userId: payload.userId,
                        difficulty: payload.difficulty,
                        categoryId: payload.categoryId,
                        categoryName: payload.categoryName,
                        score: payload.score,
                        respondedNumber: payload.respondedNumber
                    }
                )
            } else {
                console.log("レコードを上書きします")
                state.records[recordIndex].score += payload.score;
                state.records[recordIndex].respondedNumber += payload.respondedNumber;
            }
        }
    },
    actions: {
        setLocalStrage(context) {
            localStorage.setItem('userInfo', JSON.stringify(context.state.userInfo));
        },
        getLocalStrage(context) {
            context.state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }
})

export default store;