using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using System.Collections;

public class loader : MonoBehaviour {

	public GameObject submitButton;
	public GameObject inputText;
	public GameObject resultWindow;

	public void Submit(){
		Submit (null);
	}

	public void Submit(string userInputString){
		resultWindow.GetComponent<Text> ().text = "---loading---";
		string inputString = userInputString ?? inputText.GetComponent<Text>().text;
		StartCoroutine(Load (getUrl(inputString)));
	}

	public string getUrl(string query){
		return "http://localhost:8080/api/wordCombinations?format=simple&q=" + query;
	}

	IEnumerator Load(string url) {
		WWW www = new WWW(url);
		yield return www;
		resultWindow.GetComponent<Text> ().text = www.text;
	}
	 
	// Use this for initialization
	void Start () {

	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
